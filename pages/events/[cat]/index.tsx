import Image from "next/image"
import Link from "next/link"

const EventsCatPage = ({events}: any) => {
    return (
        <div>
            <h1>Events</h1>
            <div>
                {events.map(({title, image, id, city, description}: any) => (
                    <Link key={id} href={`/events/${city}/${id}`} passHref>
                        <Image
                            src={image}
                            alt={`image of ${id}`}
                            width={200}
                            height={200}
                        />
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default EventsCatPage

export async function getStaticPaths() {
    const {events_categories} = await import("../../../data/data.json")
    const appPaths = events_categories.map(({id}: any) => {
        return {
            params: {
                cat: id.toString(),
            },
        }
    })
    return {
        paths: appPaths,
        fallback: false,
    }
}

export async function getStaticProps(context: any) {
    const {allEvents} = await import("../../../data/data.json")
    const category = context.params.cat
    const events = allEvents.filter((event) => event.city === category)
    return {
        props: {
            events,
        },
    }
}
