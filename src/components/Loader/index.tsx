import { FunctionComponent } from 'react'
import LoadBall from 'assets/spin.svg'

interface IProps {
    loading: boolean
}
const LoaderCustom: FunctionComponent<IProps> = ({ loading }) => {
    return (
        <>
        {loading && (<div className="page-loader">
                <img
                    src={LoadBall}
                    alt="loader"
                />
            </div>)}
        </>

    )
}

export default LoaderCustom
