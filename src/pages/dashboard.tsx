import { Button, Card, Divider, Heading, Text } from "@/shared/ui";
import { motion } from "framer-motion";

export function Dashboard() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="row-auto grid grid-cols-1 grid-rows-none gap-8 lg:grid-cols-2 lg:grid-rows-3 xl:grid-cols-5 xl:grid-rows-3"
      exit={{
        opacity: 0,
        x: -10,
      }}
      initial={{
        opacity: 0,
        x: -10,
      }}
    >
      <RecentObservationsPanel />
      <TrainingPanel />
      <SubscriptionPanel />
      <MobileAppPanel />
      <SupportPanel />
    </motion.div>
  );
}

function RecentObservationsPanel() {
  return (
    <Card className="lg:col-span-2 lg:row-span-2 xl:col-span-3 xl:row-span-2">
      <Heading>Recent Observations</Heading>
      <Divider className="mt-6" />
    </Card>
  );
}

function MobileAppPanel() {
  return (
    <Card className="relative overflow-hidden lg:col-span-2 xl:col-span-3 xl:row-span-2">
      <Heading>OpaciTool Mobile App</Heading>
      <Divider className="my-10 mt-6" />
      <div className="w-2/3">
        <Text className="mt-6">
          The OpaciTool application is available for Android and iOS devices.
          Download to your device after you have completed the training.
        </Text>
        <div className="flex space-x-4">
          <img
            alt="App store badge"
            className="mt-6 h-12"
            src="/svg/app_store_badge.svg"
          />
          <img
            alt="Google Play badge"
            className="mt-6 h-12"
            src="/svg/google_play_badge.svg"
          />
        </div>
      </div>
      <img
        alt="App mockup"
        className="absolute right-8 mt-6 w-1/4 xl:-bottom-36"
        src="/images/app_mockup.png"
      />
    </Card>
  );
}

function TrainingPanel() {
  return (
    <Card className="flex flex-col xl:col-span-2 xl:row-span-1">
      <Heading>Training</Heading>
      <Divider className="mt-6" />
      <Text className="mt-6 flex-1">
        Complete the online training modules before using the OpaciTool
        application.
      </Text>
      <Button className="ml-auto mt-auto" to="/training">
        Start training
      </Button>
    </Card>
  );
}

function SubscriptionPanel() {
  return (
    <Card className="flex flex-col space-y-6 xl:col-span-2 xl:row-span-1">
      <Heading>Subscription</Heading>
      <Divider />

      <div className="flex flex-1 flex-col space-y-3">
        <Text>
          Your subscription is{" "}
          <span className="font-semibold" data-testid="subscription-status">
            active
          </span>
          .
        </Text>
      </div>
      <Button className="ml-auto mt-auto">Manage Subscription</Button>
    </Card>
  );
}

function SupportPanel() {
  return (
    <Card className="flex flex-col md:col-span-2 xl:row-span-2">
      <Heading>Support</Heading>
      <Divider className="mt-6" />
      <Text className="mt-6">
        If you have any questions about OpaciTool or need help with your
        observation data, reach out to our friendly Midwest support team.
      </Text>
      <Button className="ml-auto mt-auto" to="support">
        Contact support
      </Button>
    </Card>
  );
}
