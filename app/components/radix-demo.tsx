import {
  InfoCircledIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Blockquote,
  Box,
  Button,
  Callout,
  Card,
  CheckboxCards,
  Flex,
  IconButton,
  RadioCards,
  Select,
  Switch,
  Table,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";

export const RadixDemo = () => {
  return (
    <Flex direction="column" gap="2" align="start">
      <Button>Let's go</Button>
      <Box maxWidth="240px">
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Teodros Girmay
              </Text>
              <Text as="div" size="2" color="gray">
                Engineering
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>

      <Flex gap="2">
        <Badge color="orange">In progress</Badge>
        <Badge color="blue">In review</Badge>
        <Badge color="green">Complete</Badge>
      </Flex>

      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>

      <Blockquote>
        Perfect typography is certainly the most elusive of all arts. Sculpture
        in stone alone comes near it in obstinacy.
      </Blockquote>

      <Box maxWidth="600px">
        <CheckboxCards.Root
          defaultValue={["1"]}
          columns={{ initial: "1", sm: "3" }}
        >
          <CheckboxCards.Item value="1">
            <Flex direction="column" width="100%">
              <Text weight="bold">A1 Keyboard</Text>
              <Text>US Layout</Text>
            </Flex>
          </CheckboxCards.Item>
          <CheckboxCards.Item value="2">
            <Flex direction="column" width="100%">
              <Text weight="bold">Pro Mouse</Text>
              <Text>Zero-lag wireless</Text>
            </Flex>
          </CheckboxCards.Item>
          <CheckboxCards.Item value="3">
            <Flex direction="column" width="100%">
              <Text weight="bold">Lightning Mat</Text>
              <Text>Wireless charging</Text>
            </Flex>
          </CheckboxCards.Item>
        </CheckboxCards.Root>
      </Box>

      <Box maxWidth="600px">
        <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "3" }}>
          <RadioCards.Item value="1">
            <Flex direction="column" width="100%">
              <Text weight="bold">8-core CPU</Text>
              <Text>32 GB RAM</Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="2">
            <Flex direction="column" width="100%">
              <Text weight="bold">6-core CPU</Text>
              <Text>24 GB RAM</Text>
            </Flex>
          </RadioCards.Item>
          <RadioCards.Item value="3">
            <Flex direction="column" width="100%">
              <Text weight="bold">4-core CPU</Text>
              <Text>16 GB RAM</Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Box>

      <Select.Root defaultValue="apple">
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Vegetables</Select.Label>
            <Select.Item value="carrot">Carrot</Select.Item>
            <Select.Item value="potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <Switch defaultChecked />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      <TextArea placeholder="Reply to comment…" />

      <TextField.Root placeholder="Search the docs…">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Tooltip content="Add to library">
        <IconButton radius="full">
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};
