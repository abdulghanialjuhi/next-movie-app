import authStyle from '../../../styles/auth.module.scss'

export default function FormLayout({ children, otherClasses, ...restProps }) {

    return (
        <div className={`${authStyle['form-card']} ${otherClasses}`} {...restProps}>
            { children }
        </div>
    )
}
