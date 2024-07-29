import React from 'react';
import { classes, templates, compile } from 'core/js/reactHelpers';

export default function TextInput (props) {
  const {
    _isInteractionComplete,
    _id,
    _isEnabled,
    _isCorrect,
    _shouldShowMarking,
    _globals,
    displayTitle,
    body,
    instruction,
    ariaQuestion
  } = props;

  return (
    <div className="component__inner textinput__inner">

      <templates.header {...props} />

      {/* complex unless and if combination to set the correct classes for CSS to use in showing marking and disabled states */}
      <div
        className={classes([
          'component__widget textinput__widget',
          !_isEnabled && 'is-disabled',
          _isInteractionComplete && 'is-complete is-submitted show-user-answer',
          _isCorrect && 'is-correct'
        ])}
        aria-labelledby={ariaQuestion ? null : (displayTitle || body || instruction) && `${_id}-header`}
        aria-label={ariaQuestion || null}
        role='group'
      >

        {props._items.map(({ prefix, _index, input, placeholder, userAnswer, suffix }, index) =>

          <div
            className={classes([
              'textinput-item js-textinput-item',
              _shouldShowMarking && _isCorrect && 'is-correct',
              _shouldShowMarking && !_isCorrect && 'is-incorrect'
            ])}
            key={_index}>
            {prefix &&
              <div className="textinput-item__prefix-container">
                <label
                  className="textinput-item__prefix"
                  id={`${_id}-${index}-aria`}
                  htmlFor={`${_id}-${index}`}
                  aria-label={prefix}
                  dangerouslySetInnerHTML={{ __html: compile(prefix, props) }}
                >
                </label>
              </div>
            }

            <div className="textinput-item__textbox-container">
              <input
                className="textinput-item__textbox js-textinput-textbox"
                type="text"
                placeholder={placeholder}
                data-id={`${input}-${index}`}
                id={`${_id}-${index}`}
                aria-labelledby={prefix && `${_id}-${index}-aria`}
                aria-label={placeholder}
                defaultValue={userAnswer}
                disabled={!_isEnabled}
              />
              <div className="textinput-item__state">
                <div className="textinput-item__icon textinput-item__correct-icon" aria-label={_globals._accessibility._ariaLabels.correct}>
                  <div className="icon" aria-hidden="true"/>
                </div>
                <div className="textinput-item__icon textinput-item__incorrect-icon" aria-label={_globals._accessibility._ariaLabels.incorrect}>
                  <div className="icon" aria-hidden="true" />
                </div>
              </div>
            </div>

            {suffix &&
              <div className="textinput-item__suffix-container">
                <label
                  className="textinput-item__suffix"
                  id={`${_id}-${index}-aria`}
                  htmlFor={`${_id}-${index}`}
                  aria-label={suffix}
                  dangerouslySetInnerHTML={{ __html: compile(suffix, props) }}
                >
                </label>
              </div>
            }

          </div>
        )}

      </div>
      <div className="btn__container" />
    </div>
  );

}
