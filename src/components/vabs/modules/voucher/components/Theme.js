import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'

const ThemeTrigger = ({ url, smallImageWebPath: src, id, active, onClick }) => {
    return (
        <span
            style={{
                backgroundImage: `url(${src})`,
                border: active ? '2px solid black' : '2px solid transparent',
                opacity: active ? 1 : 0.5,
            }}
            onClick={() => onClick(id)}
        />
    )
}

const Theme = ({ voucher, updateVoucherTheme }) => {
    const [themes, setThemes] = useState([])

    const getVoucherTemplates = async () => {
        const templates = await fetch(`${url}?method=get_voucher_templates`)
            .then(res => res.json())
            .catch(err => console.log(err))

        if (templates) {
            setThemes(templates)
        }
    }

    useEffect(() => {
        getVoucherTemplates()
    }, [])

    return (
        <div className="vrb__grid">
            <div className="vrb__grid--column">
                <strong>Thema</strong>
                <p>
                    Welcher Hintergrund würde {voucher.recipient !== '' ? voucher.recipient : 'Max Mustermann'}{' '}
                    gefallen?
                </p>
            </div>
            <div className="vrb__grid--column">
                <div className="themes">
                    {themes.length ? (
                        themes.map(theme => (
                            <ThemeTrigger
                                key={theme.id}
                                {...theme}
                                active={voucher.theme === theme.id}
                                onClick={updateVoucherTheme}
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
    updateVoucherTheme: id =>
        dispatch({
            type: 'UPDATE_VOUCHER_THEME',
            payload: id,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
