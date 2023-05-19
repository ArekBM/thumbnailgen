export function Input(props : React.ComponentPropsWithoutRef<'input'>){
    return (< input {...props}
            className='rounded border border-grey-800 px-4 py-2 dark:text-gray-800'
            type='text'
    ></input>)
}