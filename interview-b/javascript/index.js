/*
  Return a frequency hash of answers by question_id

  SAMPLE RETURN DATA:
  {
    13903: {
      "Yes": 2,
      "No": 4
    },
    39023: {
      "Pizza": 1,
      "Burrito": 4
    }
  }
*/

function count_survey_responses(data) {
  const return_dictionary = {};
  if (data.length === 0) {
    return null;
  };
  for (let i = 0; i < data.length; i++) {
    if ('questions' in data[i] && data[i].questions.length > 0) {
      const id_block = data[i];
      for (let j = 0; j < id_block.questions.length; j++) {
        const question_block = id_block.questions[j];
        const id = question_block.question_id;
        const answers = question_block.answers;
        if (id in return_dictionary) {
          for (let k = 0; k < answers.length; k++) {
            // check if answer under id
            if (is_answer_counted(return_dictionary[id], answers[k])) {
              // if yes, increment
              return_dictionary[id][answers[k]]++;
            // else add answer and set to 1
            } else {
              return_dictionary[id][answers[k]] = 1;
            };
          };
        } else { // add question_id and answer, setting answer to 1
          return_dictionary[id] = {};
          for (let k = 0; k < answers.length; k++) {
            return_dictionary[id][answers[k]] = 1;
          };
        };
      };
    };
  };
  if (Object.keys(return_dictionary).length === 0) {
    return null;
  } else {
    return return_dictionary;
  };
};

function is_answer_counted(return_question_block, answer) {
  if (answer in return_question_block) {
    return true;
  } else {
    return false;
  };
};

/* Questions:
 * What is your linting standard?  I followed your lead with snake_case
 */

module.exports = { count_survey_responses };
