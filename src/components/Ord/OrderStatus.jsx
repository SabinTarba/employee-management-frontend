import styled from "styled-components"

function OrderStatus({ status }) {

    let color = "";

    switch (status) {
        case "Ready":
            color = "green";
            break;

        case "Processed":
            color = "grey";
            break;

        case "Waiting for confirmation":
            color = "orange";
            break;

        case "Draft":
            color = "brown";
            break;

        case "Canceled":
            color = "red";
            break;
        default:
            break;
    }

    return (
        <td>
            <Wrapper style={{ backgroundColor: color }}>{status}</Wrapper>
        </td>
    )
}

export default OrderStatus


const Wrapper = styled.div`
    color: #ffffff;
    text-align: center;
    width: 100px;
`