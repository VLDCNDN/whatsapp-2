import { TailSpin } from  'react-loader-spinner'

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <TailSpin color="#3CBC38" sixze={60} />
        </center>
    )
}

export default Loading;