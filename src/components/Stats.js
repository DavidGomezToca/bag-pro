import Swal from "sweetalert2";

export default function Stats({ items }) {
    if (!items.length) {
        return (
            <footer>
                <p className="stats">
                    <em>Start adding some items to your packing list ✈</em>
                </p>
            </footer>
        );
    };

    const numItems = items.length;
    const numPacked = items.filter(item => item[3]).length;
    const percentage = Math.round(numPacked / numItems * 100);

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
        });
    }

    return (
        <footer className="stats">
            <em className="statsText">{percentage === 100 ? "You got everything! Ready to go!" : `You have ${numItems} items on your list, and you already packed ${numPacked}. (${percentage}%)`}</em>
        </footer>
    );
};