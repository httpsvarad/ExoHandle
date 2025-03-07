"use client";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const studentsList = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
];

const classes = ["Class A", "Class B", "Class C"];

const Seat = ({ seatId, assignedStudent, onAssign }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "STUDENT",
    drop: (item) => onAssign(seatId, item.student),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-16 h-16 border rounded flex items-center justify-center text-sm transition-all cursor-pointer ${
        assignedStudent ? "bg-teal-500 text-white" : "bg-gray-200"
      } ${isOver ? "bg-green-400" : ""}`}
    >
      {assignedStudent ? assignedStudent.name : "Seat"}
    </div>
  );
};

const Student = ({ student, onDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "STUDENT",
    item: { student },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 border rounded bg-white cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
      onDragStart={() => onDrag(student.id)}
    >
      {student.name}
    </div>
  );
};

const SeatingArrangement = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [sections, setSections] = useState([
    [Array(2).fill(null)],
    [Array(2).fill(null)],
    [Array(2).fill(null)],
  ]);
  const [assignedStudents, setAssignedStudents] = useState([]);

  const handleAssign = (sectionIndex, rowIndex, seatIndex, student) => {
    if (assignedStudents.includes(student.id)) return;

    setSections((prevSections) => {
      const newSections = prevSections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? section.map((row, rIndex) =>
              rIndex === rowIndex
                ? row.map((seat, seatIdx) =>
                    seatIdx === seatIndex ? student : seat
                  )
                : row
            )
          : section
      );
      return newSections;
    });

    setAssignedStudents([...assignedStudents, student.id]);
  };

  const addBench = () => {
    setSections((prevSections) =>
      prevSections.map((section) => [...section, Array(2).fill(null)])
    );
  };

  const removeBench = () => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.length > 1 ? section.slice(0, -1) : section
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <span className="text-lg font-semibold">Select Class:</span>
          <select
            className="border p-2 rounded"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="w-1/4 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Students</h2>
            <div className="space-y-2">
              {studentsList.map((student) => (
                <Student
                  key={student.id}
                  student={student}
                  onDrag={(id) =>
                    setAssignedStudents([...assignedStudents, id])
                  }
                />
              ))}
            </div>
          </div>

          <div className="w-3/4 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">
              {selectedClass} Seating
            </h2>
            <div className="flex gap-4">
              {sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="flex flex-col gap-2 bg-[#2c275d] p-2 rounded shadow-md"
                >
                  {section.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                      {row.map((assignedStudent, seatIndex) => (
                        <Seat
                          key={`${sectionIndex}-${rowIndex}-${seatIndex}`}
                          seatId={`${sectionIndex}-${rowIndex}-${seatIndex}`}
                          assignedStudent={assignedStudent}
                          onAssign={(student) =>
                            handleAssign(
                              sectionIndex,
                              rowIndex,
                              seatIndex,
                              student
                            )
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-[#009c98] text-white rounded"
                onClick={addBench}
              >
                Add Bench
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={removeBench}
              >
                Remove Bench
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default SeatingArrangement;
