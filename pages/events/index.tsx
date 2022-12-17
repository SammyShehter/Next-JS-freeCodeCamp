import Image from "next/image"
import Link from "next/link"

const EventsPage = ({data}: any) => {
    return (
        <div>
            <h1>Events Page</h1>
            <div>
                {data.map(({title, id, image}: any) => (
                    <Link key={id} href={`/events/${id}`}>
                        <div>
                            <Image
                                src={image}
                                alt={`image of ${id}`}
                                width={300}
                                height={300}
                            />
                            <h2>{title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default EventsPage

export async function getServerSideProps() {
    const {events_categories} = await import("../../data/data.json")
    return {
        props: {
            data: events_categories,
        },
    }
}
