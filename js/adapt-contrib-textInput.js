/*
 * adapt-contrib-textInput
 * License - https://github.com/adaptlearning/adapt-contrib-textInput/blob/master/LICENSE
 * Maintainers - Kev Adsett <kev.adsett@gmail.com>, Daryl Hedley <darylhedley@hotmail.com>, Himanshu Rajotia <himanshu.rajotia@credipoint.com>
 */

define(function(require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var TextInput = QuestionView.extend({
        events: {
            "blur input":"forceFixedPositionFakeScroll",
            "focus input":"clearValidationError"
        },

        resetQuestionOnRevisit: function() {
            this.setAllItemsEnabled(false);
            this.resetQuestion();
        },

        setupQuestion: function() {
            // Check if items need to be randomised
            if (this.model.get('_isRandom') && this.model.get('_isEnabled')) {
                this.model.set("_items", _.shuffle(this.model.get("_items")));
            }
        },

        disableQuestion: function() {
            this.setAllItemsEnabled(false);
        },

        enableQuestion: function() {
            this.setAllItemsEnabled(true);
        },

        setAllItemsEnabled: function(isEnabled) {
            _.each(this.model.get('_items'), function(item, index) {
                var $itemInput = this.$('input').eq(index);

                if (isEnabled) {
                    $itemInput.prop('disabled', false);
                } else {
                    $itemInput.prop('disabled', true);
                }
            }, this);
        },

        onQuestionRendered: function() {
            this.setReadyStatus();
            console.log(this.model)
        },

        forceFixedPositionFakeScroll: function() {
            if (Modernizr.touch) {
                _.defer(function() {
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                });
            }
        },

        clearValidationError: function() {
            this.$(".textinput-item-textbox").removeClass("textinput-validation-error");
        },

        // Use to check if the user is allowed to submit the question
        canSubmit: function() {
            var canSubmit = true;
            this.$(".textinput-item-textbox").each(function() {
                if ($(this).val() == "") {
                    canSubmit = false;
                }
            });
            return canSubmit;
        },

        onCannotSubmit: function() {
            this.showValidationError();
        },

        showValidationError: function() {
            this.$(".textinput-item-textbox").addClass("textinput-validation-error");
        },

        // This is important for returning or showing the users answer
        // This should preserve the state of the users answers
        storeUserAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                item.userAnswer = this.$('.textinput-item-textbox').eq(index).val();
            }, this);
        },

        isCorrect: function() {
            var numberOfCorrectAnswers = 0;
            _.each(this.model.get('_items'), function(item, index) {
                var userAnswer = this.$(".textinput-item-textbox").eq(index).val();
                if (this.checkAnswerIsCorrect(item["_answers"], userAnswer)) {
                    numberOfCorrectAnswers++;
                    item._isCorrect = true;
                    this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
                    this.model.set('_isAtLeastOneCorrectSelection', true);
                } else {
                    item._isCorrect = false;
                }
            }, this);

            return (numberOfCorrectAnswers === this.model.get('_items').length);
        },

        checkAnswerIsCorrect: function(possibleAnswers, userAnswer) {
            var answerIsCorrect = _.contains(possibleAnswers, this.cleanupUserAnswer(userAnswer));
            if (answerIsCorrect) this.model.set('_hasAtLeastOneCorrectSelection', true);
            return answerIsCorrect;
        },

        cleanupUserAnswer: function(userAnswer) {
            if (this.model.get('_allowsAnyCase')) {
                userAnswer = userAnswer.toLowerCase();
            }
            if (this.model.get('_allowsPunctuation')) {
                var userAnswerClean = userAnswer.replace(/[\.,-\/#!$£%\^&\*;:{}=\-_`~()]/g, "");
                userAnswer = $.trim(userAnswerClean);
            }
            return userAnswer;
        },

        setScore: function() {
            var numberOfCorrectAnswers = this.model.get('_numberOfCorrectAnswers');
            var questionWeight = this.model.get("_questionWeight");
            var itemLength = this.model.get('_items').length;

            var score = questionWeight * numberOfCorrectAnswers / itemLength;

            this.model.set('_score', score);
        },

        showMarking: function() {
            _.each(this.model.get('_items'), function(item, i) {
                var $item = this.$('.textinput-item').eq(i);
                $item.addClass(item._isCorrect ? 'correct' : 'incorrect');
            }, this);
        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        resetUserAnswer: function() {
            _.each(this.model.get('_items'), function(item) {
                item["_isCorrect"] = false;
                item["userAnswer"] = "";
            }, this);
        },

        resetQuestion: function() {
            this.resetItems();
        },

        resetItems: function() {
            this.$('.textinput-item-textbox').prop('disabled', !this.model.get('_isEnabled')).val('');

            this.model.set({
                _isAtLeastOneCorrectSelection: false
            });
        },

        showCorrectAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                this.$(".textinput-item-textbox").eq(index).val(item._answers[0]);
            }, this);
        },

        hideCorrectAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                this.$(".textinput-item-textbox").eq(index).val(item.userAnswer);
            }, this);
        }
    });

    Adapt.register("textinput", TextInput);

    return TextInput;
});