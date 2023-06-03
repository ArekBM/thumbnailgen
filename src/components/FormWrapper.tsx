import clsx from 'clsx';

export function FormWrapper(props: React.ComponentPropsWithoutRef<'div'>){
    return(
        <div {...props} className={clsx('p-4 border rounded shadow', props.className)}>
            {props.children}
        </div>
    )
}
