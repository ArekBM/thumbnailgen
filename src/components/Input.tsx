export function Input(props : React.ComponentPropsWithoutRef<'input'>){
    return (< input {...props}
            className='border border-grey-800'
            type='text'
    ></input>)
}