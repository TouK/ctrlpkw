angular.module('app.templates',[]).run(['$templateCache',function(t){t.put("/templates/ballot.html",'<div ng-controller="BallotController as ctrl" layout="column" flex class="controller"><div ng-if="ctrl.loading" class="progress-linear top fixed"></div><div ng-switch="subview" layout="column" flex class="view-switch"><div ng-switch-default flex class="subview content"><div class="padding"><section class="ballot"><h1>Wypełnij wyniki kandydatów</h1><div class="table"><div ng-repeat="option in ctrl.ballot.options" class="row"><div class="column label"><h2 class="name">{{option.split(\' \')[0]}}</h2><p class="small">{{option.split(\' \').slice(1).join(\' \')}}</p></div><div class="column input"><input ng-model="ctrl.result.votesCountPerOption[$index]" type="tel" required ng-pattern="/^[0-9]+$/"></div></div></div></section><section class="ballot"><h1>Wypełnij informacje o głosowaniu</h1><div class="table"><div class="row"><div class="column label">Liczba wyborców uprawnionych</div><div class="column input"><input ng-model="ctrl.result.votersEntitledCount" type="tel" required ng-pattern="/^[0-9]+$/"></div></div><div class="row"><div class="column label">Liczba wyborców, którym wydano karty</div><div class="column input"><input ng-model="ctrl.result.ballotsGivenCount" type="tel" required ng-pattern="/^[0-9]+$/"></div></div><div class="row"><div class="column label">Liczba oddanych głosów</div><div class="column input"><input ng-model="ctrl.result.votesCastCount" type="tel" required ng-pattern="/^[0-9]+$/"></div></div><div class="row"><div class="column label">Liczba głosów ważnych</div><div class="column input"><input ng-model="ctrl.result.votesValidCount" type="tel" required ng-pattern="/^[0-9]+$/"></div></div></div></section></div><div class="divider"></div><div class="buttons"><a ng-href="#/wards/{{ctrl.communityCode}}/{{ctrl.wardNo}}/ballots/{{ctrl.ballot.no}}/photos" promised-fn="ctrl.sendResult()" class="button"><span class="text">dalej</span></a></div></div><div ng-switch-when="photos" layout="column" flex class="subview"><div flex class="content padding"><section class="photos"><h1>Zrób zdjęcia protokołu</h1><div class="buttons"><button ng-click="ctrl.takePhoto(true)" class="button"><i class="icon-photo-library"></i><span class="text">wybierz zdjęcie</span></button><button ng-click="ctrl.takePhoto()" class="button"><i class="icon-photo-camera"></i><span class="text">zrób zdjęcie</span></button></div></section><section ang-if="ctrl.images.length" class="photos"><div class="grid-list"><div ng-repeat="image in ctrl.images" class="grid-tile image"><img ng-src="{{image.src}}"><div ng-if="!image.res.$resolved" class="grid-tile-footer">przesyłam...</div></div></div></section></div><div class="divider"></div><div class="buttons"><a ang-if="ctrl.images.length" ng-href="#/wards/{{ctrl.communityCode}}/{{ctrl.wardNo}}/ballots/{{ctrl.ballot.no}}/share" promised-fn="ctrl.sendResult()" class="button"><span class="text">zakończ</span></a></div></div><div ng-switch-when="share" class="subview"><div class="content padding"><section class="share"><h1>Podziel się</h1><div class="buttons"><button class="button facebook"><span class="text">facebook</span></button><button class="button twitter"><span class="text">twitter</span></button></div></section></div><div class="buttons"><a ng-if="ctrl.data.selectedWards.length &gt; 1" ng-href="#/wards" class="button"><span class="text">inne obwody w pobliżu</span></a><a ng-href="#/voting" class="button"><span class="text">powrot do mapy</span></a></div></div></div></div>'),t.put("/templates/voting.html",'<div ng-controller="VotingController as ctrl" flex layout="column" class="controller"><div ng-if="ctrl.data.wardsLoading" class="progress-linear top fixed"></div><div flex layout="column" class="map-wrapper"><!--img.mapImage(ng-if=\'ctrl.image.url\', ng-src=\'{{ctrl.image.url}}\', style="margin-top: -{{ctrl.image.height/2}}px; top: 50%")--><map flex markers="ctrl.data.markers" masked="ctrl.mapMasked" image="ctrl.mapImage" on-init="ctrl.init" center-map-fn="mainCtrl.centerMap" get-map-center-fn="ctrl.getMapCenter" on-marker-click="ctrl.onMarkerClick"></map><button ng-click="ctrl.updateWards()" class="button circle accent raised bottom right"><i class="icon-find-replace"></i></button></div></div>'),t.put("/templates/votings.html",'<div ng-controller="VotingsController as ctrl" class="controller"><div class="list"><a ng-repeat="voting in ctrl.data.votings" ng-href="#/wards/{{voting.date}}" ng-class="{\'selected\': voting.date != ctrl.data.selectedVoting}" class="item"><div class="item-content"><div class="tile-left"><i class="icon-event primary"></i></div><div class="tile-content"><h2>{{voting.date | amDateFormat:\'LL\'}}</h2><p>{{voting.description}}</p></div></div></a></div></div>'),t.put("/templates/ward.html",'<!--mixin subview(name)--><!--	div(ng-switch-when=name, flex, layout="column")--><!--		div(ng-include="\'/templates/" + name + ".html\'", flex, layout="column")--><div ng-controller="WardController as ctrl" ng-switch="subview" layout="column" flex class="controller"><div ng-switch-default flex layout="column" class="content md-padding"><md-list><a ng-repeat="ballot in ctrl.data.ballots" ng-href="#/wards/{{ctrl.communityCode}}/{{ctrl.wardNo}}/ballots/{{ballot.no}}"><md-item><md-item-content><div class="md-tile-left"><md-icon md-font-icon="icon-description" class="md-primary md-hue-3"></md-icon></div><div class="md-tile-content"><p class="md-caption">{{ballot.question}}</p></div></md-item-content></md-item></a></md-list></div><div ng-switch-when="ballot" flex layout="column"><div ng-include="\'/templates/ballot.html\'" flex layout="column"></div></div></div>'),t.put("/templates/wards.html",'<div ng-controller="WardsController as ctrl" flex layout="column" class="controller"><div ng-if="ctrl.data.selectedWards.length &amp;&amp; ctrl.data.wardsLoading" class="progress-linear top fixed"></div><div flex ng-if="ctrl.data.selectedWards.length" class="content"><div class="list"><a ng-repeat="ward in ctrl.data.selectedWards" ng-href="#/wards/{{ward.communityCode}}/{{ward.no}}" class="item"><div class="item-content"><div class="tile-left"><i class="icon-place primary"></i></div><div class="tile-content"><h2>{{ward.label}}</h2><p>{{ward.address}}</p></div></div></a></div></div><div flex ng-if="!ctrl.data.selectedWards.length" layout="column" layout-align="center center" us-spinner class="placeholder-loading"><h1 ng-if="ctrl.locationPending" class="md-body-1">Oczekuję na lokalizacje...</h1><h1 ng-if="ctrl.data.wardsLoading" class="md-body-1">Pobieram listę lokali...</h1></div><div class="divider"></div><div class="buttons"><a ng-href="#/voting" class="button"><span class="text">znajdź lokal wyborczy na mapie</span></a></div></div>');
}])