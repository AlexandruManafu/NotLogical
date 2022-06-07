import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CircuitsComponent } from './components/circuits/circuits.component';
import { CircuitEntryComponent } from './components/circuit-entry/circuit-entry.component';
import { SearchBarComponent } from '../general/components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelsComponent } from './components/levels/levels.component';
import { LevelEntryComponent } from './components/level-entry/level-entry.component';
import { LevelBuilderComponent } from './components/level-builder/level-builder.component';
import { RouterModule } from '@angular/router';
import { LevelBuilderConditionComponent } from './components/level-builder-condition/level-builder-condition.component';
import { TestEditComponent } from './components/test-edit/test-edit.component';
import { AppRoutingModule } from '../app-routing.module';
import { LevelBuilderStartComponent } from './components/level-builder-start/level-builder-start.component';
import { CircuitDrawModule } from '../circuit-draw/circuit-draw.module';
import { LevelBuilderPreviewComponent } from './components/level-builder-preview/level-builder-preview.component';

import { DragDropModule} from '@angular/cdk/drag-drop';
import { LevelBuilderCanvasNavigationComponent } from './components/level-builder-canvas-navigation/level-builder-canvas-navigation.component';
import { LevelDescriptionOverlayComponent } from './components/level-description-overlay/level-description-overlay.component';
import { TestsWithoutNavigationComponent } from './components/tests-without-navigation/tests-without-navigation.component';
import { LevelBuilderSaveComponent } from './components/level-builder-save/level-builder-save.component';
import { LevelComponent } from './components/level/level.component';
import { LevelRemoteComponent } from './components/level-remote/level-remote.component';

@NgModule({
  declarations: [
    CircuitsComponent,
    CircuitEntryComponent,
    SearchBarComponent,
    LevelsComponent,
    LevelEntryComponent,
    LevelBuilderComponent,
    LevelBuilderConditionComponent,
    TestEditComponent,
    LevelBuilderStartComponent,
    LevelBuilderPreviewComponent,
    LevelBuilderCanvasNavigationComponent,
    LevelDescriptionOverlayComponent,
    TestsWithoutNavigationComponent,
    LevelBuilderSaveComponent,
    LevelComponent,
    LevelRemoteComponent
],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CircuitDrawModule,
    DragDropModule
  ]
}
)
export class UserContentModule { }
