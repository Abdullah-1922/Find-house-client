import EditProperty from "../../_components/modules/allProperties/editProperty";

const EditPropertyPage = ({ params }: { params: { propertyId: string } }) => {
  return <EditProperty propertyId={params.propertyId} />;
};

export default EditPropertyPage;
