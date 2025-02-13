import { TranslationsContext } from "../contexts/TranslationsContext"

import Swal from "sweetalert2"
import SocialMedia from "./SocialMedia"
import { useContext } from "react"

/**
 * @component Footer.
 * @param {array[items]} items - The items list.
 * @returns {JSX.Element} - The Footer component.
 */
export default function Footer({ items }) {
    /**
     * Translations context.
     * @type {object}.
     */
    const { translations } = useContext(TranslationsContext)

    /**
     * Texts translated.
     * @type {object}.
     */
    const texts = translations.footer;

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
                <div className="stats">
                    <em>{texts[0]} ✈</em>
                    <SocialMedia />
                </div>
            </footer>
        )
    }
    // If the percentage is 100%, display a success alert using SweetAlert2.
    if (percentage >= 100) {
        Swal.fire({
            title: texts[1],
            text: texts[2],
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
            <em className="statsText">{percentage === 100 ? `${texts[3]}` : `${texts[4]} ${numItems} ${texts[5]} ${numPacked}. (${percentage}%)`}</em>
            <SocialMedia />
        </footer>
    )
}