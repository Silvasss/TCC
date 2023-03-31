import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'


const MapGoogle = ({ latitude, longitude, pais, estado, cidade }) => {
    // https://www.googlemapsgenerator.com/en/

    const styles = {
        modal: {
            fontSize: "12px",
        },
        content: {
            width: "100%",
            padding: "1px 1px",
        },
        close: {
            cursor: "pointer",
            position: "absolute",
            display: "block",
            padding: "2px 5px",
            lineHeight: "20px",
            right: "-10px",
            top: "-10px",
            fontSize: "24px",
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #cfcece",
        },
        frame:{
            width:"100%", 
            height:"600px"
        }
    }

    if (!pais) {
        return (
            <Popup trigger={<button className="button"> Ver no mapa </button>} modal nested>
                {close => (
                    <div className="modal" style={styles.header}>
                        <button className="close" onClick={close} style={styles.close}>&times;</button>

                        <div className="content" style={styles.content}>
                            <iframe title='mapGoogle' style={styles.frame} src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=15&amp&output=embed`}></iframe>
                        </div>
                    </div>
                )}
            </Popup>
        )
    } else{
        return (
            <Popup trigger={<button className="button"> Ver no mapa </button>} modal nested>
                {close => (
                    <div className="modal" style={styles.header}>
                        <button className="close" onClick={close} style={styles.close}>&times;</button>

                        <div className="content" style={styles.content}>
                            <iframe title='mapGoogle' style={styles.frame} src={`https://maps.google.com/maps?q=${(estado && cidade) ? `${pais},${estado},${cidade}` : `${pais}`}&hl=es&z=15&amp&output=embed`}></iframe>
                        </div>
                    </div>
                )}
            </Popup>
        )
    }

}


export default MapGoogle