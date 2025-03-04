export default function PlusMinus({value}: {value: number}) {

    return(
        <>
            {
            value > 0 ? 
                <div style={{color: 'var(--green-500)'}}>
                    +{value}
                </div>
            : value === 0 ? 
                    <div></div>
                : 
                    <div style={{color: 'var(--red-500)'}}>
                        {value}
                    </div>
                
            }
        </>
    )
}