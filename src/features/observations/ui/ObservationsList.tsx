import { toNumericDateString, toTimeString } from "@/helpers";
import { useObservations } from "@/shared/hooks";
import { Skeleton } from "@/shared/ui";
import { Badge } from "@/shared/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useEffect, useRef } from "react";

export function ObservationsList() {
  const { hasMore, isFetching, isLoading, observations, fetchNextPage } =
    useObservations();

  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = triggerRef.current;

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchNextPage();
      }
    });

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [fetchNextPage, hasMore, isLoading, isFetching]);

  return (
    <>
      <Table className="[--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Facility Name</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader className="text-right">Mode</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <SkeletonRows />}
          {observations?.map((observation) => (
            <TableRow
              data-testid="observation-row"
              href={`/observations/${observation.uid}`}
              key={observation.id}
              title={`Order #${observation.id}`}
            >
              <TableCell>{observation.id}</TableCell>
              <TableCell className="text-zinc-500">
                {observation.facility_name || "-"}
              </TableCell>
              <TableCell className="text-zinc-500">
                {toNumericDateString(observation.observation_date) || "-"}
              </TableCell>
              <TableCell className="text-zinc-500">
                {`${toTimeString(observation.start_time)} - ${toTimeString(
                  observation.end_time,
                )}`}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  className="uppercase"
                  color={observation.type === "test" ? "blue" : "orange"}
                >
                  {observation.type}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {isFetching && <SkeletonRows />}
        </TableBody>
      </Table>
      <div ref={triggerRef} />
    </>
  );
}

function SkeletonRows() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <TableRow data-testid="skeleton-row" key={`skeleton-${index}`}>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell className="text-zinc-500">
            <Skeleton />
          </TableCell>
          <TableCell className="text-zinc-500">
            <Skeleton />
          </TableCell>
          <TableCell className="text-zinc-500">
            <Skeleton />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
