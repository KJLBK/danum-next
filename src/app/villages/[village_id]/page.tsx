type Props = {
    params: {
        v_id: string;
    };
};

export default function VillageViewPage({ params }: Props) {
    const b = params.v_id;

    return (
        <>
            <p>{b}</p>
        </>
    );
}
