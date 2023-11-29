import React from "react"

function List({ items }) {
  return (
    items && (
      <div className="pagecontent__list">
        <ul>
          {items.map((item, index) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    )
  )
}

export default List
