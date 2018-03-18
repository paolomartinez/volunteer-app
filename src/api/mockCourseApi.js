import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "ucsd-med-center",
    title: "UCSD Medical Center",
    watchHref: "https://health.ucsd.edu/Pages/default.aspx",
    image: "https://www.healthcare-informatics.com/sites/healthcare-informatics.com/files/ucsd-medical-center.jpg",
    authorId: "Dr. Nutter",
    date: "Ongoing",
    areaCode: "92122",
    category: "Medical",
    description: "The University California, San Diego is one of the world's leading public research universities, located in beautiful La Jolla, California."
  },
  {
    id: "anime-expo",
    title: "Anime Expo",
    watchHref: "http://www.anime-expo.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosplayers_of_Naruto_at_Anime_Expo_2006-07-02.jpg/240px-Cosplayers_of_Naruto_at_Anime_Expo_2006-07-02.jpg",
    authorId: "Comic-Con International",
    date: "April 2 - 4, 2018",
    areaCode: "92422",
    category: "Anime",
    description: "Anime Expo is the largest celebration of Japanese pop culture in North America! Join us in downtown LA on July 5-8, a2018, plus Pre-Show Night on July 4!"
  },
  {
    id: "westfield-mall",
    title: "Westfield Mall",
    watchHref: "https://www.westfield.com/utc",
    authorId: "Westfield",
    date: "May 8 - 10, 2018",
    areaCode: "94322",
    category: "Shopping",
    description: "From organic living to the casual elegance of La Jolla, Westfield UTC presents the ultimate resort shopping experience. Located in the vibrant core of San Diego's most affluent beach community, Westfield UTC serves one of the most affluent trade areas in the country."
  },
  {
    id: "react-creating-reusable-components",
    title: "Creating Reusable React Components",
    watchHref: "http://pluralsight.com/courses/react-creating-reusable-components",
    authorId: "cory-house",
    category: "JavaScript"
  },
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    category: "JavaScript"
  },
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(course);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          return course.courseId == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;
