import { FormModalProvider } from '../../context/FormModalContext';
import VisibleEmissionsPartOne from "./VisibleEmissionsPartOne";
import VisibleEmissionsPartTwo from "./VisibleEmissionsPartTwo";

export default function VisibleEmissionsForm() {
  return (
    <FormModalProvider>
      <section className='grid lg:grid-cols-2 gap-4 bg-white  p-8'>
        <VisibleEmissionsPartOne />
        <VisibleEmissionsPartTwo />
      </section>
    </FormModalProvider>
  );
}
