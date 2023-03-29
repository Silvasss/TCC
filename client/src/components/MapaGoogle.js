import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'



const MapGoogle = ({ nomeInstituicao }) => {
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

    //console.log(nomeInstituicao.replace(/\s/g, '+'))    

    //const url = "https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=AVEC%20-%20Associa%C3%A7%C3%A3o%20Vilhenense%20de%20Educa%C3%A7%C3%A3o%20e%20Cultura+(Title)&amp;ie=UTF8&amp;t=p&amp;z=9&amp;iwloc=B&amp;output=embed"
    //const url = `https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=-22.02590000%2C%20-47.06702000+(Title)&amp;ie=UTF8&amp;t=p&amp;z=9&amp;iwloc=B&amp;output=embed`
  
    return (
        <Popup trigger={<button className="button"> Ver no mapa </button>} modal nested>
            {close => (
            <div className="modal" style={styles.header}>
                <button className="close" onClick={close} style={styles.close}>&times;</button>

                <div className="content" style={styles.content}>
                    <iframe style={styles.frame} src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=-22.02590000%2C%20-47.06702000+(Title)&amp;ie=UTF8&amp;t=p&amp;z=9&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>
            )}
        </Popup>
    )

}


export default MapGoogle