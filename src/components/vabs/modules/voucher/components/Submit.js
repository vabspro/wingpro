import React, { useState } from 'react'
import { connect } from 'react-redux'

const url = location.origin

const Submit = ({
    url,
    contact,
    errors,
    voucher,
    redirect,
    agb,
    datenschutz,
    updateErrorMessages,
    onSuccess,
    onSubmit,
}) => {
    const [dsgvoCheck, setDsgvoCheck] = useState(false)

    const validate = () => {
        if (
            contact.first_name === '' ||
            contact.last_name === '' ||
            contact.email === '' ||
            contact.mobile === '' ||
            contact.street === '' ||
            contact.street_number === '' ||
            contact.zip_code === '' ||
            contact.city === '' ||
            voucher.value === null ||
            voucher.theme === null ||
            voucher.recipient === '' ||
            !dsgvoCheck
        ) {
            updateErrorMessages({
                first_name: contact.first_name === '',
                last_name: contact.last_name === '',
                email: contact.email === '',
                mobile: contact.mobile === '',
                street: contact.street === '',
                street_number: contact.street_number === '',
                zip_code: contact.zip_code === '',
                city: contact.city === '',
                value: voucher.value === null,
                theme: voucher.theme === null,
                recipient: voucher.recipient === '',
                dsgvoCheck: !dsgvoCheck,
            })
            return false
        } else {
            return true
        }
    }

    const createContact = async () => {
        const mainContact = await fetch(`${url}?method=create_new_contact`, {
            method: 'POST',
            body: JSON.stringify({
                firstname: contact.first_name,
                lastname: contact.last_name,
                email: contact.email,
                mobile: contact.mobile,
                street: contact.street,
                number: contact.number,
                zip_code: contact.zip_code,
                city: contact.city,
                lead: 'true',
                shorttext: 'was soll hier rein?',
            }),
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        return mainContact.contact_id
    }

    const createVoucherRecipientContact = async () => {
        const recipientContact = await fetch(`${url}?method=create_new_contact`, {
            method: 'POST',
            body: JSON.stringify({
                firstname: voucher.recipient.split(' ')[0],
                lastname: voucher.recipient.split(' ')[1],
                email: 'xxx@xxx.xx',
                mobile: '00000000',
            }),
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        return recipientContact.contact_id
    }

    const createSalesOrder = async id => {
        const salesOrder = await fetch(`${url}?method=add_sales_order`, {
            method: 'POST',
            body: JSON.stringify({
                contact_id: id,
                shorttext: '',
            }),
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        return salesOrder
    }

    const createSalesLine = async ({ salesHeaderId, shipToContactId }) => {
        const salesLine = await fetch(`${url}?method=add_sales_line`, {
            method: 'POST',
            body: JSON.stringify({
                sales_header_id: salesHeaderId,
                object_id: voucher.value,
                quantity: 1,
                ship_to_contact_id: shipToContactId,
                voucher_template_id: voucher.theme,
                object_code: 8,
            }),
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        return salesLine.sales_line_id
    }

    const createInvoice = async ({ salesHeaderId }) => {
        const invoiceNumber = await fetch(`${url}?method=create_invoice`, {
            method: 'POST',
            body: JSON.stringify({
                sales_header_id: salesHeaderId,
            }),
        })
            .then(res => res.json())
            .catch(err => console.log(err))

        return invoiceNumber
    }

    const handleFormSubmit = async () => {
        onSubmit(true)
        if (!validate()) {
            console.log('form is not valid')
            onSubmit(false)
            return
        }

        console.log('creating contact id')
        const contactId = await createContact()
        console.log(`main contact id: ${contactId}`)

        const shipToContactId = await createVoucherRecipientContact()
        console.log(`ship to contact id: ${shipToContactId}`)

        if (contactId) {
            console.log('creating sales order')
            const salesOrder = await createSalesOrder(contactId)
            console.log(`sales order: ${shipToContactId}`)

            if (salesOrder) {
                console.log('creating sales header')
                const salesHeaderId = salesOrder.sales_header_id
                console.log(`sales header id: ${salesHeaderId}`)

                const salesLine = await createSalesLine({ salesHeaderId, shipToContactId })
                console.log(`sales line ${salesLine}`)

                if (salesLine) {
                    console.log(`creating invoice`)
                    const invoice = await createInvoice({ salesHeaderId })

                    if (invoice) {
                        console.log(`invoice: ${invoice}`)
                        if (redirect) {
                            window.location.href = redirect
                        } else {
                            onSuccess()
                        }
                    }
                }
            }
        }
    }

    return (
        <div>
            <div className="vrb__grid">
                <div className="vrb__grid--column" />
                <div className="vrb__grid--column">
                    <div className="vrb__billing--form">
                        <div className="dsgvo">
                            <label className={errors.dsgvoCheck ? 'error' : null}>
                                <input
                                    type="checkbox"
                                    required
                                    value={dsgvoCheck}
                                    onChange={e => {
                                        setDsgvoCheck(e.target.checked)
                                    }}
                                />
                                <span>
                                    Mit Absenden des Formulares, bestätige ich die{' '}
                                    {datenschutz ? (
                                        <a href={datenschutz} target="_blank">
                                            Datenschutzrichtlinien
                                        </a>
                                    ) : (
                                        'Datenschutzrichtlinien'
                                    )}{' '}
                                    und die{' '}
                                    {agb ? (
                                        <a href={agb} target="_blank">
                                            AGB
                                        </a>
                                    ) : (
                                        'AGB'
                                    )}{' '}
                                    gelesen und verstanden zu haben und stimme diesen zu
                                </span>
                            </label>
                        </div>
                        <button onClick={handleFormSubmit}>Gutschein bestellen</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    contact: state.ContactReducer,
    voucher: state.VoucherReducer,
    errors: state.ErrorReducer,
})

const mapDispatchToProps = dispatch => ({
    updateErrorMessages: errors =>
        dispatch({
            type: 'UPDATE_ERROR_MESSAGES',
            payload: errors,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
