import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
      seeRoom: async(_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const {id } = args;
        const{user} = request;
        const canSee = await prisma.$exists.rooms({
          participants_some: {
            id: user.id
          }
        });
        if(canSee){
          return prisma.rooms({ id })
        }else{
          throw Error("You can't see this");
        }
    }
  }
}