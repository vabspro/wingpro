import React, { useEffect, useRef, useState } from "react"
import ContactForm from "./components/ContactForm"
import { connect } from "react-redux"
import Success from "../booking/components/Success"

const formatedDate = date => {
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return (
    year + "-" + monthNames[monthIndex] + "-" + String(day).padStart(2, "0")
  )
}

const ContactModule = ({ url, contact, redirect, datenschutz }) => {
  const wrapper = useRef()

  const [loading, setLoading] = useState(false)
  const [success, updateSuccess] = useState(false)

  const fetchData = async (method, data = {}) => {
    let response = await fetch(url + "?method=" + method, {
      method: "POST",
      body: JSON.stringify(data),
    })

    let d = await response.json()
    return d
  }

  const createNewContact = async contact => {
    console.log(contact)
    return await fetchData("create_new_contact", {
      firstname: contact.first_name,
      lastname: contact.last_name,
      email: contact.email,
      mobile: contact.mobile,
      shorttext: `Interesse: ${contact.interest.split("_")[1]}`,
      note: contact.message,
      lead: "true",
      date_from: formatedDate(contact.range[0]),
      date_to: formatedDate(contact.range[1]),
    })
  }

  const assignInterestToContact = async id => {
    return await fetchData("create_new_interest", {
      contact_id: id,
      interest_id: contact.interest.split("_")[0],
    })
  }

  const submit = async () => {
    setLoading(true)
    const mainContactID = await createNewContact(contact)
    const assignedInterestToContact = await assignInterestToContact(
      mainContactID.contact_id
    )
    if (assignedInterestToContact.id) {
      updateSuccess(true)
    }
  }

  useEffect(() => {
    if (success) {
      const session = {
        customer: {
          name: `${contact.first_name} ${contact.last_name}`,
          email: contact.email,
        },
      }
      window.sessionStorage.setItem("vrb", JSON.stringify(session))

      if (redirect) {
        window.location.href = redirect
      } else {
        wrapper.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        })
      }
    }
  }, [success])
  return (
    <div className="vrb__wrapper" id="contact" ref={wrapper}>
      {success ? (
        <Success type="form" />
      ) : (
        <ContactForm
          onSubmit={submit}
          loading={loading}
          datenschutz={datenschutz}
          url={url}
        />
      )}
    </div>
  )
}
const mapStateToProps = state => ({
  contact: state.ContactReducer,
})
export default connect(mapStateToProps)(ContactModule)
