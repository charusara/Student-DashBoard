import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BarChart from "./Barchart";
import GPABarChart from "./gpaBarchart";
import CgpaPieChart from "./CgpaPieChart";
import records from "../db.json";
import { useParams } from "react-router-dom";
import Header from "./Header";
import CgpaSemLineChart from "./CgpaSemLineChart";

const BarchartData = () => {
  const { registerNumber } = useParams();
  const selectedData = records.filter(
    (item) => item.registerNumber === registerNumber
  );

  const calculateGradePoint = (grade) => {
    switch (grade) {
      case "O":
        return 10;
      case "A+":
        return 9;
      case "A":
        return 8;
      case "B+":
        return 7;
      case "B":
        return 6;
      case "C":
        return 5;
      case "RA":
        return 0;
      default:
        return 0;
    }
  };

  const calarr = {
    gpasem: [],
    gradepointcgpa: [],
    creditscgpa: [],
    cgpax: [],
    xarr: [],
    cgpasem: [],
  };
  let cgpa = 0;

  const calculateGPA = (values, credits, semester, gpavalue) => {
    if (values.length !== credits.length) {
      throw new Error("Values and credits arrays must have the same length");
    }

    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < values.length; i++) {
      const gradePoint = values[i];
      const credit = credits[i];

      totalGradePoints += gradePoint * credit;
      totalCredits += credit;
    }

    const gpa = totalGradePoints / totalCredits;

    if (gpavalue === 0) {
      calarr.cgpasem.push(gpa);
      calarr.xarr.push(semester);
    } else {
      calarr.gpasem.push(gpa);
      calarr.cgpax.push(semester);
    }
  };

  const calculateCGPA = () => {
    const totalGPA = calarr.gpasem.reduce((acc, gpa) => acc + gpa, 0);
    cgpa = totalGPA / calarr.gpasem.length;
    return cgpa;
  };

  return (
    <>
      <div className="pb-5">
        <Header />
      </div>
      <div className="flex flex-wrap border-black items-center ">
        {selectedData.map((record) => (
          <div key={record.registerNumber} className="mb-4">
            <h3 className="text-4xl font-semibold pb-5 ">
              {record.name} - {record.registerNumber}
            </h3>

            <div className="grid grid-cols-3 border-black gap-10">
              {record.semesters.map((record1) => {
                const data = {
                  labels: [],
                  values: [],
                };

                record1.performance &&
                  record1.performance.forEach((detail) => {
                    data.labels.push(detail.course_code);
                    data.values.push(calculateGradePoint(detail.grade));
                    calarr.gradepointcgpa.push(
                      calculateGradePoint(detail.grade)
                    );
                    calarr.creditscgpa.push(detail.credits);
                  });

                return (
                  <div key={record1.semester} className="h-60">
                    <div className="card mb-3">
                      <h5 className="card-title">
                        Semester: {record1.semester}
                      </h5>
                      <BarChart data={data} key={record1.semester} />
                      {calculateGPA(
                        data.values,
                        record1.performance.map((detail) => detail.credits),
                        record1.semester,
                        1
                      )}
                    </div>
                    {calculateGPA(
                      calarr.gradepointcgpa,
                      calarr.creditscgpa,
                      record1.semester,
                      0
                    )}
                    {console.log(calarr.gradepointcgpa)}
                    {console.log(calarr.creditscgpa)}
                    {console.log(calarr.cgpasem)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-20">
          <div className="card mb-3">
            <h4>GPA OF EACH SEMESTER</h4>
            <GPABarChart calarr={calarr} className="chart" />
          </div>
          <div className="card w-[300px]">
            <h4>CGPA</h4>
            <CgpaPieChart cgpa={calculateCGPA()} />
          </div>
          <div className="card mb-3">
            <h4>CGPA EACH SEMESTER</h4>
            <CgpaSemLineChart calarr={calarr} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BarchartData;
