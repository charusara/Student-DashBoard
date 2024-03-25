// import BarChart from "./Barchart";
// import GPABarChart from "./gpaBarchart";
// import records from "../db.json";
// import { useParams } from 'react-router-dom';

// const Cgpa= () => {
//   const { registerNumber } = useParams();
//   const selectedData = records.filter((item) => item.registerNumber === registerNumber);

//   const calculateGradePoint = (grade) => {
//     // Grade calculation function
//   };

//   const calarr = {
//     gradepoints: [],
//     credits: [],
//     gpasem: [],
//     xarr: [],
//   };

//   const calculateGPA = (values, credits) => {
//     // GPA calculation function
//   };

//   let totalCGP = 0;
//   let totalCredits = 0;

//   selectedData.forEach((record) => {
//     record.semesters.forEach((semester) => {
//       semester.performance.forEach((detail) => {
//         const gradePoint = calculateGradePoint(detail.grade);
//         const credit = detail.credits;

//         totalCGP += gradePoint * credit;
//         totalCredits += credit;
//       });
//     });
//   });

//   const cgpa = totalCGP / totalCredits;

//   return (
//     <div className="container chart-container">
//       <h1 className="chart-title">Student Dashboard</h1>
//       {selectedData.map((record) => (
//         <div key={record.registerNumber}>
//           <h3 className="chart-title">{record.registerNumber}</h3>
//           {record.semesters.map((record1) => {
//             const data = {
//               labels: [],
//               values: [],
//             };

//             calarr.xarr.push(record1.semester);

//             return (
//               <React.Fragment key={record1.semester}>
//                 {record1.performance &&
//                   record1.performance.map((detail) => {
//                     // Data population logic
//                     return null;
//                   })}
//               </React.Fragment>
//             );
//           })}
//           <BarChart data={data} className="chart" />
//         </div>
//       ))}
//       <GPABarChart calarr={calarr} className="chart" />
//       <div>
//         <h3 className="chart-title">CGPA: {cgpa.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// };

// export default Cgpa;
