import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'

const VoucherValue = ({ url, id, unitPrice: price, onClick, active }) => {
    return (
        <span
            onClick={() => onClick(id)}
            style={{
                color: active ? 'black' : '#ccc',
                border: active ? '2px solid black' : '2px solid #ccc',
            }}
        >
            {price}€
        </span>
    )
}

const Value = ({ voucher, updateVoucherValue }) => {
    const [vouchList, setVoucherList] = useState([])

    const fetchVoucher = async () => {
        const vouchers = await fetch(`${url}?method=get_voucher`)
            .then(res => res.json())
            .catch(err => console.log(err))

        if (vouchers) {
            setVoucherList(vouchers)
        }
    }

    useEffect(() => {
        fetchVoucher()
    }, [])

    return (
        <div className="vrb__grid">
            <div className="vrb__grid--column">
                <strong>Wert</strong>
                <p>Wie hoch soll der Wert deines Gutscheins sein?</p>
            </div>
            <div className="vrb__grid--column">
                <div className="vouchers">
                    {vouchList.length ? (
                        vouchList
                            .sort((a, b) => {
                                if (parseInt(a.unitPrice) < parseInt(b.unitPrice)) {
                                    return -1
                                }
                                if (parseInt(a.unitPrice) > parseInt(b.unitPrice)) {
                                    return 1
                                }
                                return 0
                            })
                            .map(v => (
                                <VoucherValue
                                    {...v}
                                    key={v.id}
                                    active={voucher.value === v.id}
                                    onClick={updateVoucherValue}
                                />
                            ))
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    voucher: state.VoucherReducer,
})

const mapDispatchToProps = dispatch => ({
    updateVoucherValue: id =>
        dispatch({
            type: 'UPDATE_VOUCHER_VALUE',
            payload: id,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Value)
