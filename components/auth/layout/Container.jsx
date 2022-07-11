import authStyle from '../../../styles/auth.module.scss'

export default function FormLayout({ children}) {

    return (
        <div className={authStyle.container}>
                { children }
        </div>
    )
}
