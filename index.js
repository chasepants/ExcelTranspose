const csv = require('csvtojson');
const csvFilePath = './thesis_intercoder_11.csv';

async function main() {
  const jsonArray = await csv().fromFile(csvFilePath);

  const rows = {};

  //for each object, find Q2 (File Name) in files
  //add question, add coder name with answer
  jsonArray.forEach(score => {
    let i = 0;
    let question_name = '';
    for (var key in score) {
      if (i > 1) {
        question_name = key;
        if (!rows[score['Q2 (File Name)']]) {
          //if row does not exist
          rows[score['Q2 (File Name)']] = {
            columns: {}
          };
        }
        if (!rows[score['Q2 (File Name)']].columns[question_name]) {
          //if column does not exist
          rows[score['Q2 (File Name)']].columns[question_name] = {
            coders: []
          };
        }
        let coder = {
          name: score['Coder'],
          score: score[question_name]
        };
        rows[score['Q2 (File Name)']].columns[question_name].coders.push(coder);
      }
      i++;
    }
  });

  let row1 = '';
  let column_count = 0;
  for (const questions in rows['1.1'].columns) {
    row1 += `,${questions},`;
    column_count++;
  }
  let row2 = 'Q2 (File Name),';
  for (let index = 0; index < column_count; index++) {
    row2 += 'Madison,Anna,';
  }
  console.log(row1);
  console.log(row2);
  let row_builder = '';
  for (const file in rows) {
    row_builder = `${file},`;
    for (const question in rows[file].columns) {
      row_builder += `${rows[file].columns[question].coders[1].score},`;
      row_builder += `${rows[file].columns[question].coders[0].score},`;
    }
    console.log(row_builder);
  }
}

main();
