#adapt-contrib-textInput

An Adapt core question component that allows the learner to input text based upon a question stem.

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-contrib-textinput

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:
 
        "adapt-contrib-textinput": "*"

##Usage

Once installed, the component can be used to create a text input component that allows the user to write any answer they like in response to initial question text. The author is also able to set a suffix and prefix to the text field should they wish. Multiple 'correct' answers are allowed to be given, for example, to cater for variations in spelling.

Once installed, the component can be used to create a text input component that allows the user to write any answer they like in response to initial question text. Note that due to the open-ended nature of this component type, there is no 'correct' answer.

##Settings overview

For example JSON format, see [example.json](https://github.com/adaptlearning/adapt-contrib-textInput/blob/master/example.json). A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)

Further settings for this component are:

####_component

This value must be: `textinput`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####_attempts

Default: `1`

Specifies the number of attempts for this question.

####_shouldDisplayAttempts

Default: `false`

When set to true the number of attempts remaining is shown below the buttons.

####_allowsAnyCase

Default: `true`

Set this value to `false` to make the user match the case for each answer.

####_allowsPunctuation

Default: `true`

If set to `true` allows the following punctuation/characters within the answer:

```
) ( ~ ` _ - = } { : ; * & ^ % £ $ ! # - / , .`
```

####_answers
**_Optional_ **

This allows for answers which are not dependant on order to be specified, allowing the learner to give the correct answers in any order, and still be marked correct. This attribute expects a 2-dimensional array with the same length as the `_items` array. Each entry can contain all acceptable variations of the correct answer e.g. one, 1, I (roman) etc. Make sure to place as first the answer that will be displayed as correct ("model") answer.

```
"_answers": [
   ["one",1,"I"],
   ["two",2,"II"],
   ["three",3,"III"]   
]
```

####_items

Each item represents one text input box for this question and contains values for `prefix`, `suffix` and `_answers`.

**prefix:** Text entered in this setting will appear before the input area.

**suffix:** Text entered in this setting will appear after the input area.

**placeholder** The placeholder setting specifies a short hint that describes the expected value of the input field.

**_answers:** Specify correct answer. This can contain all acceptable variations of the correct answer e.g. one, 1, I (roman) etc. Make sure to place as first the answer that will be displayed as correct ("model") answer.

```
   "_answers": [
      "2",
      "two",
      "II"
   ]
```
Note that `_items._answers` are not used when top level `_answers` are used.

##Limitations
 
When top level `_answers` are used then `_isRandom` set to true doesn't have expected results as user can answer in any order.

##Browser spec

This component has been tested to the standard Adapt browser specification.
