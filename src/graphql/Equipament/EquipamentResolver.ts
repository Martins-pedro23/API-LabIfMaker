import { Query, Resolver } from "type-graphql";

@Resolver()
class EquipamentResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

export default EquipamentResolver;
