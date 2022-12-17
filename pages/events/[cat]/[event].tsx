import Image from "next/image"

const Page = ({data}: any) => {

    return (
        <div>
            <Image
                src={data.image}
                alt={data.id}
                width={1000}
                height={500}
            ></Image>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    )
}

export default Page

export async function getStaticPaths() {
    const {allEvents} = await import("../../../data/data.json")
    const allPaths = allEvents.map((event) => {
        return {
            params: {
                cat: event.city,
                event: event.id.toString(),
            },
        }
    })

    return {
        paths: allPaths,
        fallback: false,
    }
}

export async function getStaticProps(context: any) {
    const {allEvents} = await import("../../../data/data.json")
    const id = context.params.event

    const eventData = allEvents.find((event) => event.id === id)
    return {
        props: {data: eventData},
    }
}
