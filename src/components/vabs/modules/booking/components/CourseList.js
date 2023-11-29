import React, { useEffect, useState, useRef } from "react"
import Course from "./Course"
import { connect } from "react-redux"
import "isomorphic-fetch"
const CourseList = ({
  url,
  active = false,
  addCourseToQuery,
  courseQuery,
  type,
  ids,
  selectedCourses,
  id,
  refreshSelectedCourseList,
}) => {
  const container = useRef()
  const [style, setStyle] = useState({})

  const updateStyles = () => {
    setStyle({
      height: active ? "auto" : "0px",
      overflow: "hidden",
      padding: active ? "16px" : "0px",
    })
  }

  useEffect(() => {
    if (container) {
      updateStyles()
    }
  }, [active])

  useEffect(() => {
    if (container) {
      setTimeout(() => updateStyles(), 400)
    }
  }, [selectedCourses.length])

  useEffect(() => {
    if (!courseQuery.length) {
      const method =
        type && type === "group" ? "get_courses_of_group" : "get_courses"
      fetch(`${url}?method=${method}&ids=${ids}`)
        .then(response => response.json())
        .then(response => {
          response.forEach(course => addCourseToQuery(course))
        })
        .then(() => setTimeout(() => updateStyles(), 400))
    }
  }, [])

  useEffect(() => {
    if (courseQuery.length && id) {
      const match = courseQuery.find(course => course.id === id)
      if (match) {
        setTimeout(() => {
          console.log({ match })
          refreshSelectedCourseList(match)
        }, 500)
      }
    }
  }, [courseQuery, id])

  return (
    <div className="vrb__courselist">
      <div className="vrb__courselist--header">
        <strong>1. Kursauswahl</strong>
        <small>welchen Kurs möchtest du besuchen?</small>
      </div>
      <div className="vrb__courselist--body" ref={container} style={style}>
        {courseQuery && courseQuery.length ? (
          courseQuery
            .sort((a, b) => {
              if (parseInt(a.online_pos) < parseInt(b.online_pos)) {
                return -1
              }
              if (parseInt(a.online_pos) > parseInt(b.online_pos)) {
                return 1
              }
              return 0
            })
            .map(course => <Course url={url} key={course.id} course={course} />)
        ) : (
          <div className="vrb__loader">loading</div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courseQuery: state.CourseReducer,
  selectedCourses: state.SelectedCourseReducer,
})

const mapDispatchToProps = dispatch => ({
  addCourseToQuery: course =>
    dispatch({
      type: "ADD_COURSE_TO_QUERY",
      payload: course,
    }),
  refreshSelectedCourseList: course =>
    dispatch({
      type: "REFRESH_SELECTED_COURSES",
      payload: course,
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
