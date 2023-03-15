type SendButtonType = {
    onClick: any
    focusState: boolean
}

const SendButton = (props: SendButtonType) => {
    return (
        <div className="flex cursor-pointer " onClick={props.onClick}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14.0342 0.839798L1.33424 4.7748C1.09898 4.83724 0.890178 4.97398 0.738899 5.16466C0.58762 5.35534 0.501954 5.58977 0.49465 5.83307C0.487345 6.07636 0.558793 6.31551 0.69836 6.51492C0.837927 6.71433 1.03815 6.86335 1.26924 6.9398L7.02924 8.8698C7.05023 8.87778 7.06944 8.88984 7.08575 8.90529C7.10205 8.92074 7.11513 8.93926 7.12424 8.9598L9.24424 14.4598C9.33003 14.6808 9.48144 14.8701 9.67811 15.0024C9.87477 15.1347 10.1072 15.2036 10.3442 15.1998H10.3742C10.6152 15.199 10.8498 15.1223 11.0446 14.9804C11.2394 14.8386 11.3845 14.6389 11.4592 14.4098L15.4992 2.2798C15.5626 2.08559 15.5718 1.8778 15.526 1.67872C15.4802 1.47964 15.3811 1.2968 15.2392 1.1498C15.0875 0.990515 14.8942 0.877014 14.6811 0.82221C14.4681 0.767406 14.244 0.773499 14.0342 0.839798Z"
                    fill={props.focusState ? '#29b080' : '#474749'}
                />
            </svg>
        </div>
    )
}

export default SendButton
