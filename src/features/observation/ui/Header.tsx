import { toNumericDateString } from "@/helpers";
import { Observation } from "@/shared/model";
import {
  Badge,
  Button,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  Heading,
  Spinner,
} from "@/shared/ui";
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useDeleteObservation } from "../hooks";
import toast from "react-hot-toast";

type Props = {
  coverImageUrl?: string | null;
  observation: Observation;
};

export function Header({ coverImageUrl, observation }: Props) {
  const navigate = useNavigate();

  const { deleteObservation, isPending } = useDeleteObservation({
    observationUID: observation.uid,
    onDeleted: () => {
      navigate("/observations");
      toast.success("Observation deleted");
    },
    onFailed: () => {
      toast.error("Failed to delete observation");
    },
  });

  return (
    <header className="space-y-4">
      <span
        className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400 print:hidden"
        role="button"
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
        Back
      </span>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0 print:hidden">
            {coverImageUrl ? (
              <img
                alt={`Observation #${observation.id}`}
                className="aspect-[3/2] content-center rounded-lg object-cover shadow"
                src={coverImageUrl}
              />
            ) : (
              <div className="flex aspect-[3/2] items-center justify-center rounded-lg bg-zinc-200 shadow dark:bg-zinc-800">
                <QuestionMarkCircleIcon className="size-6 fill-zinc-600 dark:fill-zinc-400" />
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4">
              <Heading>
                Visible Emissions Observation Data #{observation.id}
              </Heading>
              <Badge
                className="uppercase"
                color={observation.type === "test" ? "blue" : "orange"}
              >
                {observation.type}
              </Badge>
            </div>
            <div className="mt-1 text-sm/6 text-zinc-400">
              UID: {observation.uid}
            </div>
            <div className="mt-1 text-sm/6 text-zinc-500">
              {observation.observation_date
                ? toNumericDateString(observation.observation_date)
                : "Date visited not available"}
            </div>
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button
            outline
            target="_blank"
            to={`/observations/${observation.uid}/print`}
          >
            <PrinterIcon className="size-4" />
            Print
          </Button>
          <Dropdown>
            <DropdownButton as={Button} plain>
              <EllipsisVerticalIcon className="size-4" />
            </DropdownButton>
            <DropdownMenu anchor="bottom end" className="min-w-64">
              <DropdownItem to="/support">
                <QuestionMarkCircleIcon />
                <DropdownLabel>Get Help</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                className={isPending ? "pointer-events-none opacity-50" : ""}
                disabled={isPending}
                isDanger
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this observation?",
                    )
                  ) {
                    deleteObservation();
                  }
                }}
              >
                <TrashIcon />
                <DropdownLabel>Delete</DropdownLabel>

                {isPending && <Spinner className="ml-auto" />}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
