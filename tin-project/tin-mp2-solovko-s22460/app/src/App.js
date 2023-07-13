import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer'
import {Routes, Route } from 'react-router-dom';

import TeacherList from './components/teacher/TeacherList'
import TeacherDetails from "./components/teacher/TeacherDetails";
import TeacherForm from "./components/teacher/TeacherForm";

import StudentList from "./components/student/StudentList";
import StudentDetails from "./components/student/StudentDetails";
import StudentForm from "./components/student/StudentForm";
import GradesList from "./components/grades/GradesList";
import GradesDetails from "./components/grades/GradesDetails";
import GradesForm from "./components/grades/GradesForm";
function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="teachers">
          <Route index={true} element={<TeacherList />} />
          <Route path="details/:tchrId" element={<TeacherDetails />} />
          <Route path="add" element={<TeacherForm />} />
          <Route path="edit/:tchrId" element={<TeacherForm />} />
        </Route>
        <Route path="students">
          <Route index={true} element={<StudentList />} />
          {<Route path="details/:studId" element={<StudentDetails />} />}
          {<Route path="add" element={<StudentForm />} />}
          {<Route path="edit/:studId" element={<StudentForm />} />}
        </Route>
        <Route path="grades">
          <Route index={true} element={<GradesList />} />
          {<Route path="details/:grdId" element={<GradesDetails />} />}
          {<Route path="add" element={<GradesForm />} />}
          {<Route path="edit/:grdId" element={<GradesForm />} />}
        </Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;