import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
  return (
    <tr>
      
      <td><a href={course.watchHref} target="_blank">Info</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.areaCode}</td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.date}</td>
      <td>{course.description}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
