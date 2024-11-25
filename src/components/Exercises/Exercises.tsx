import Layout from "../../Layout/Dashboard/Layout";
import { useApiGet } from "../../utils/hooks/query";
import { usePopup } from "../../utils/hooks/usePopUp";
import { get_exercises } from "../../api/activities";
import Table from "../Commons/Table";
import Button from "../Commons/Button";


export default function Exercises(){
    const {hidePopup, setHidePopup} = usePopup()
    const {
            data,
            isLoading,
            isFetching,
            isPending,
            error,
            isError,
            isLoadingError
        } = useApiGet(["exercises"], get_exercises)

        if (isLoading || isFetching || isPending){
            return <div>Fetching Exercises</div>
        }

        if (isError || isLoadingError){
            console.log(error)
            return (<div>Error fetching exercises</div>)
        }

        console.log(data)
        let data_to_render;

        if (data){
            data_to_render = data.map(exercise => ({
            id: exercise.id,
            name: exercise.name.en,
            description: exercise.description.en,
            create_at: exercise.created_at,
            sub_exercises: exercise.sub_activities
        }))
        }

        const table_columns = [
            {header: "Name", accessorKey: "name"},
            {header: "description", accessorKey: "description"}
        ]

        const button = <Button text="Create Exercise" styling="text-white py-2" />
    return (
        <Layout>
            {data && <div className="p-6">
                <Table data={data_to_render} columns={table_columns} initialPageSize={10} actionBtn={button} searchMsg={"Search Exercises"} />
            </div>}
        </Layout>
    )
}