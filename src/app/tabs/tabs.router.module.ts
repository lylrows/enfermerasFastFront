import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin/admin.guard';
import { EnfermeraBusquedaComponent  } from '../enfermera-busqueda/enfermera-busqueda.component';
import { EnfermeraCitasComponent } from '../enfermera-citas/enfermera-citas.component';
import { ChatComponent } from '../firebasev2/chat/chat.component';
import { MantenimientoEspecialidadComponent } from '../mantenimiento/mantenimiento-especialidad/mantenimiento-especialidad.component';
import { MantenimientoParametroComponent } from '../mantenimiento/mantenimiento-parametro/mantenimiento-parametro.component';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // /app/ redirect
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
          },
          {
            path: 'mantenimiento-servicio',
            loadChildren: () => import('../fashion/listing/fashion-listing.module').then(m => m.FashionListingPageModule)
          },
          {
            path: 'fashion/:productId',
            loadChildren: () => import('../fashion/details/fashion-details.module').then(m => m.FashionDetailsPageModule)
          },
          {
            path: 'appointment',
            loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
          },
          {
            path: 'food',
            loadChildren: () => import('../food/listing/food-listing.module').then(m => m.FoodListingPageModule)
          },
          {
            path: 'food/:productId',
            loadChildren: () => import('../food/details/food-details.module').then(m => m.FoodDetailsPageModule)
          },
          {
            path: 'travel',
            loadChildren: () => import('../travel/listing/travel-listing.module').then(m => m.TravelListingPageModule)
          },
          {
            path: 'travel/:productId',
            loadChildren: () => import('../travel/details/travel-details.module').then(m => m.TravelDetailsPageModule)
          },
          {
            path: 'deals',
            loadChildren: () => import('../deals/listing/deals-listing.module').then(m => m.DealsListingPageModule)
          },
          {
            path: 'deals/:productId',
            loadChildren: () => import('../deals/details/deals-details.module').then(m => m.DealsDetailsPageModule)
          },
          {
            path: 'real-estate',
            loadChildren: () => import('../real-estate/listing/real-estate-listing.module').then(m => m.RealEstateListingPageModule)
          },
          {
            path: 'real-estate/:productId',
            loadChildren: () => import('../real-estate/details/real-estate-details.module').then(m => m.RealEstateDetailsPageModule)
          },
          {
          path: 'busqueda-enfermera',
          component: EnfermeraBusquedaComponent , 
          canActivate: [AdminGuard]
          },
          {
            path: 'nurses',
            loadChildren: () => import('../nurses/nurses.module').then( m => m.NursesPageModule)
          },
          {
          path: 'enfermera-cita',
          component: EnfermeraCitasComponent, 
          canActivate: [AdminGuard]
          },
          {
            path: 'report',
            loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
          },
          {
            path: 'matenimiento-parametro',
            component: MantenimientoParametroComponent, 
            canActivate: [AdminGuard]
          },
          {
            path: 'matenimiento-especialidad',
            component: MantenimientoEspecialidadComponent, 
            canActivate: [AdminGuard]
          },
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('../user/profile/user-profile.module').then(m => m.UserProfilePageModule)
          },
          {
            path: 'friends',
            loadChildren: () => import('../user/friends/user-friends.module').then(m => m.UserFriendsPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
          }
        ]
      },
      {
        path: 'chat',
        loadChildren: () => import('../firebasev2/chat/chat.module').then(m => m.ChatModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
