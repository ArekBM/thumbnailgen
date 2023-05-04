export function FormWrapper(props: React.ComponentPropsWithoutRef<'div'>){
    return(
        <div {...props} className='flex flex-col gap-5 items-center justify-center'>
            {props.children}
        </div>
    )
}