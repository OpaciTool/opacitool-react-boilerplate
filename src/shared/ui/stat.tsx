import { Badge, Divider, Field, Subheading } from "@/shared/ui";

export function Stat({
  children,
  title,
  renderTitle,
  value,
  change,
}: {
  children?: React.ReactNode;
  title?: string;
  renderTitle?: () => React.ReactNode;
  value?: string;
  change?: string;
}) {
  return (
    <li role="listitem">
      <Divider className="mb-6" />
      <Field>
        {renderTitle ? (
          renderTitle()
        ) : (
          <Subheading className="mt-6 text-lg/6 font-medium sm:text-sm/6">
            {title}
          </Subheading>
        )}
        <div className="mt-3 text-3xl/8 font-semibold sm:text-xl/8">
          {children ? children : value}
        </div>
        {!!change && (
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <Badge color={change.startsWith("+") ? "lime" : "pink"}>
              {change}
            </Badge>{" "}
            <span className="text-zinc-500">from last week</span>
          </div>
        )}
      </Field>
    </li>
  );
}
