import Swal from "sweetalert2"
import SocialMedia from "./SocialMedia"

/**
 * @component Footer.
 * @param {array[items]} items - The items list.
 * @returns {JSX.Element} - The Footer component.
 */
export default function Footer({ items }) {
    /**
     * Number of items.
     * @type {number}.
     */
    const numItems = items.length

    /**
     * Number of items packed.
     * @type {number}.
     */
    const numPacked = items.filter(item => item[3]).length

    /**
     * Percentage of items packed.
     * @type {number}.
     */
    const percentage = Math.round(numPacked / numItems * 100)

    // If there are no items, return a message.
    if (!items.length) {
        return (
            <footer>
                <p className="stats">
                    <em>Start adding some items to your packing list ✈</em>
                    <SocialMedia />
                </p>
            </footer>
        )
    }
    // If the percentage is 100%, display a success alert using SweetAlert2.
    if (percentage >= 100) {
        Swal.fire({
            title: "Ready to go!",
            text: "You got everything!",
            icon: "success",
            customClass: {
                htmlContainer: "swal2-text",
                popup: "swal2-popup",
                confirmButton: "swal2-text"
            }
        })
    }

    return (
        <footer className="stats">
            <em className="statsText">{percentage === 100 ? "You got everything! Ready to go!" : `You have ${numItems} items on your list, and you already packed ${numPacked}. (${percentage}%)`}</em>
            <SocialMedia />
        </footer>
    )
}