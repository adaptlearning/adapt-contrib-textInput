import QuestionModel from 'core/js/models/questionModel';

export default class TextInputModel extends QuestionModel {

  init() {
    this.genericAnswerIndexOffset = 65536;
    QuestionModel.prototype.init.call(this);

    this.set('_genericAnswerIndexOffset', this.genericAnswerIndexOffset);

    this.setupQuestionItemIndexes();
    this.checkCanSubmit();
  }

  setupQuestionItemIndexes() {
    this.get('_items').forEach(function(item, index) {

      if (item._index === undefined) item._index = index;
      if (item._answerIndex === undefined) item._answerIndex = -1;

    });
  }

  restoreUserAnswers() {
    if (!this.get('_isSubmitted')) return;

    const userAnswer = this.get('_userAnswer');
    const genericAnswers = this.get('_answers');
    this.get('_items').forEach(function(item) {
      const answerIndex = userAnswer[item._index];
      if (answerIndex >= this.genericAnswerIndexOffset) {
        item.userAnswer = genericAnswers[answerIndex - this.genericAnswerIndexOffset];
        item._answerIndex = answerIndex;
      } else if (answerIndex > -1) {
        item.userAnswer = item._answers[answerIndex];
        item._answerIndex = answerIndex;
      } else {
        if (item.userAnswer === undefined) item.userAnswer = '******';
        item._answerIndex = -1;
      }
      if (item.userAnswer instanceof Array) item.userAnswer = item.userAnswer[0];
    });

    this.setQuestionAsSubmitted();
    this.markQuestion();
    this.setScore();
    this.setupFeedback();
  }

  setupRandomisation() {
    if (!this.get('_isRandom') || !this.get('_isEnabled')) return;

    this.set('_items', _.shuffle(this.get('_items')));
  }

  // Use to check if the user is allowed to submit the question
  canSubmit() {
    // can submit if every item has user input
    return this.get('_items').every(({ userAnswer }) => userAnswer);
  }

  setItemUserAnswer(itemIndex, userAnswer) {
    const item = this.get('_items')[itemIndex];
    item.userAnswer = userAnswer;
    this.checkCanSubmit();
  }

  //This preserve the state of the users answers for returning or showing the users answer
  storeUserAnswer() {
    const items = this.get('_items');

    this.isCorrect();

    const userAnswer = new Array( items.length );
    items.forEach(function(item, index) {
      userAnswer[ item._index ] = item._answerIndex;
    });
    this.set('_userAnswer', userAnswer);
  }

  isCorrect() {
    if (this.get('_answers')) {
      this.markGenericAnswers();
    } else {
      this.markSpecificAnswers();
    }
    // do we have any _isCorrect == false?
    return !_.contains(_.pluck(this.get('_items'), '_isCorrect'), false);
  }

  isPartlyCorrect() {
    return this.get('_isAtLeastOneCorrectSelection');
  }

  // Allows the learner to give answers into any input, ignoring the order.
  // (this excludes any inputs which have their own specific answers).
  markGenericAnswers() {
    let numberOfCorrectAnswers = 0;
    const correctAnswers = this.get('_answers').slice();
    const usedAnswerIndexes = [];

    this.get('_items').forEach(item => {
      correctAnswers.forEach(function(answerGroup, answerIndex) {
        if (_.indexOf(usedAnswerIndexes, answerIndex) > -1) return;

        if (this.checkAnswerIsCorrect(answerGroup, item.userAnswer) == false) return;

        usedAnswerIndexes.push(answerIndex);
        item._isCorrect = true;
        item._answerIndex = answerIndex + this.genericAnswerIndexOffset;

        this.set({
          _numberOfCorrectAnswers: ++numberOfCorrectAnswers,
          _isAtLeastOneCorrectSelection: true
        });

      }, this);
      if(!item._isCorrect) item._isCorrect = false;
    });
  }

  // Marks any items which have answers specific to it
  // (i.e. item has a _answers array)
  markSpecificAnswers() {
    let numberOfCorrectAnswers = 0;
    this.get('_items').forEach(item => {
      if (!item._answers) return;
      const userAnswer = item.userAnswer || '';
      if (this.checkAnswerIsCorrect(item._answers, userAnswer)) {
        item._isCorrect = true;
        item._answerIndex = _.indexOf(item._answers, this.cleanupUserAnswer(userAnswer));
        this.set({
          _numberOfCorrectAnswers: ++numberOfCorrectAnswers,
          _isAtLeastOneCorrectSelection: true
        });
      } else {
        item._isCorrect = false;
        item._answerIndex = -1;
      }
    });
  }

  checkAnswerIsCorrect(possibleAnswers, userAnswer) {
    const uAnswer = this.cleanupUserAnswer(userAnswer);
    const matched = possibleAnswers.filter(cAnswer => {
      return this.cleanupUserAnswer(cAnswer) == uAnswer;
    });

    const answerIsCorrect = matched && matched.length > 0;
    if (answerIsCorrect) this.set('_hasAtLeastOneCorrectSelection', true);
    return answerIsCorrect;
  }

  cleanupUserAnswer(userAnswer) {
    if (this.get('_allowsAnyCase')) {
      userAnswer = userAnswer.toLowerCase();
    }
    if (this.get('_allowsPunctuation')) {
      userAnswer = userAnswer.replace(/[\.,-\/#!$£%\^&\*;:{}=\-_`~()]/g, '');
      //remove any orphan double spaces and replace with single space (B & Q)->(B  Q)->(B Q)
      userAnswer = userAnswer.replace(/(  +)+/g, ' ');
    }
    // removes whitespace from beginning/end (leave any in the middle)
    return $.trim(userAnswer);
  }

  // Used to set the score based upon the _questionWeight
  setScore() {
    var numberOfCorrectAnswers = this.get('_numberOfCorrectAnswers');
    var questionWeight = this.get('_questionWeight');
    var itemLength = this.get('_items').length;

    var score = questionWeight * numberOfCorrectAnswers / itemLength;

    this.set('_score', score);
  }

  resetUserAnswer() {
    this.get('_items').forEach(function(item) {
      item._isCorrect = false;
      item.userAnswer = '';
    });
  }

  /**
  * used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
  * returns the user's answers as a string in the format 'answer1[,]answer2[,]answer3'
  * the use of [,] as an answer delimiter is from the SCORM 2004 specification for the fill-in interaction type
  */
  getResponse() {
    return _.pluck(this.get('_items'), 'userAnswer').join('[,]');
  }

  /**
  * used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
  */
  getResponseType() {
    return 'fill-in';
  }
}

