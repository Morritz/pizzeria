import { Controller, Get } from '@nestjs/common';
import { Pizza, Ingredient } from '@prisma/client';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    // const onePizza = await this.prisma.pizza.findFirst();
    // const ingredients = await this.prisma.ingredientsOnPizzas.findMany({
    //   where: {
    //     pizzaId: onePizza.id_pizza
    //   }, select: {
    //     ingredient: {
    //       select: {
    //         name: true
    //       }
    //     }
    //   }
    // })
    // return ingredients.map((result) => {
    //   return result.ingredient.name
    // });
    const pizzas = await this.prisma.pizza.findMany({
      include: {
        ingredients: {
          select: {
            name: true,
          },
        },
      },
    });

    const test2 = await this.prisma.ingredient.create({
      data: {
        name: Date.now().toString(),
      },
    });

    const test3 = await this.prisma.ingredient.create({
      data: {
        name: Date.now().toString(),
      },
    });

    const test = await this.prisma.pizza.create({
      data: {
        name: Date.now().toString(),
        price: 100.0,
        ingredients: {
          connect: [{ id: test2.id }, { id: test3.id }],
        },
        dough: {
          connectOrCreate: {
            create: {
              name: 'Cienkie',
            },
            where: {
              name: 'Cienkie',
            },
          },
        },
        finalPrice: 1000.0,
      },
    });
    console.log(test);
    return pizzas;
  }
}
