Ext.define('AmsMain.view.map.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map-panel',
    init: function ()
    {
        var me = this;
        AmsMain.getApplication().on('layerAdded', function () {
            me.createLayers.call(me);
        });
        AmsMain.getApplication().on('layerEdited', function () {
            me.createLayers.call(me);
        });
        AmsMain.util.Global.on('activeThemeLoaded', function () {
            me.createLayers.call(me);
        });
        AmsMain.util.Global.on('nodeCheckChange', function () {
            me.updateLayerVisibility.call(me);
        });
        AmsMain.util.Global.on('nodeCheckChange', function () {
            me.updateLayerVisibility.call(me);
        });
        AmsMain.getApplication().on('logginSuccess', function () {
            if (me.getView().map !== null)
            {
                var userExtend = AmsUi.util.Param.getParam('Sig', 'User_Extend', null);
                var userZoom = AmsUi.util.Param.getParam('Sig', 'User_Zoom', null);
                if (userExtend !== null)
                {
                    var userExtendInfos = userExtend.split(",");
                    if (userExtendInfos.length === 4)
                    {
                        if (userExtendInfos[0] !== "NaN" && userExtendInfos[1] !== "NaN" && userExtendInfos[2] !== "NaN" && userExtendInfos[3] !== "NaN")
                        {

                            var proj4326 = ol.proj.get("EPSG:4326");
                            var proj3857 = ol.proj.get("EPSG:3857");
                            var userExtendInfoConverted = [parseFloat(userExtendInfos[0]), parseFloat(userExtendInfos[1]), parseFloat(userExtendInfos[2]), parseFloat(userExtendInfos[3])];
                            var center = ol.extent.getCenter(userExtendInfoConverted);
                            var centerMercator = ol.proj.transform(center, proj4326, proj3857);
                            me.getView().map.getView().setCenter(centerMercator);
                            if (userZoom !== null)
                            {
                                me.getView().map.getView().setZoom(parseInt(userZoom));
                            }
                        }
                    }


                }

            }
        });

    },
    updateLayerVisibility: function ()
    {
        console.log('updateLayerVisibility');
        this.getView().getMap().getLayers().forEach(function (item) {
            var code = "Node_" + item.get('nodeId') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';

            item.setVisible(isNodeChecked);
        });


    },
    getLayer: function (id)
    {
        var layer = null;
        this.getView().getMap().getLayers().forEach(function (item) {
            if (item.get('nodeId') === id)
            {
                layer = item;
            }
        });
        return layer;
    }
    ,
    createLayers: function ()
    {
        var me = this;
        me.getView().getMap().getLayers().clear();
        console.log('create layers');
        var treeStore = Ext.data.StoreManager.lookup('AmsMain.store.Tree');
        treeStore.each(function (item) {
            var jsonParam = item.get('jsonParam');
            if (jsonParam !== null)
            {
                var params = Ext.JSON.decode(jsonParam, true);
                if (params !== null)
                {
                    if (params.nodeType === 'layer' && params.layerType === 'tile')
                    {
                        me.createLayerTile.call(me, item, params);
                    }
                }
            }
        });
        treeStore.each(function (item) {
            var jsonParam = item.get('jsonParam');
            if (jsonParam !== null)
            {
                var params = Ext.JSON.decode(jsonParam, true);
                if (params !== null)
                {
                    if (params.nodeType === 'layer' && params.layerType === 'metier')
                    {
                        me.createLayerMetier.call(me, item, params);
                    }
                }
            }
        });

    },
    createLayerTile: function (record, params)
    {

        if (params.tileSource === 'osm')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible: isNodeChecked
            });

            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);

        }
        else if (params.tileSource === 'bing_road')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                    imagerySet: 'Road'
                            // use maxZoom 19 to see stretched tiles instead of the BingMaps
                            // "no photos at this zoom level" tiles
                            // maxZoom: 19
                })
            });

            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }
        else if (params.tileSource === 'bing_aerial')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                    imagerySet: 'Aerial'
                            // use maxZoom 19 to see stretched tiles instead of the BingMaps
                            // "no photos at this zoom level" tiles
                            // maxZoom: 19
                })
            });

            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }
        else if (params.tileSource === 'bing_aerial_with_labels')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                    imagerySet: 'AerialWithLabels'
                            // use maxZoom 19 to see stretched tiles instead of the BingMaps
                            // "no photos at this zoom level" tiles
                            // maxZoom: 19
                })
            });

            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }
        else if (params.tileSource === 'mq_osm')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                source: new ol.source.MapQuest({
                    layer: 'osm'
                })
            });
            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }
        else if (params.tileSource === 'mq_sat')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                source: new ol.source.MapQuest({
                    layer: 'sat'
                })
            });
            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }
        else if (params.tileSource === 'mq_hybrid')
        {
            var code = "Node_" + record.get('id') + "_Checked";
            var isNodeChecked = AmsUi.util.Param.getParam('Sig', code, '0') === '1';
            var layer = new ol.layer.Tile({
                visible: isNodeChecked,
                source: new ol.source.MapQuest({
                    layer: 'hyb'
                })
            });
            layer.set('nodeId', record.get('id'));
            this.getView().getMap().getLayers().push(layer);
        }



    },
    createLayerMetier: function (record, params)
    {
        
        
        var schema = params.schema;
        var table = params.table;
        var tableInfos = table.split('.');
        var tableName = tableInfos[tableInfos.length - 1];
        var proj4326 = ol.proj.get("EPSG:4326");
        var proj3857 = ol.proj.get("EPSG:3857");
        var vectorSource = new ol.source.ServerVector({
            format: new ol.format.GeoJSON(),
            loader: function (extent, resolution, projection) {
                var extentPt1 = ol.proj.transform([extent[0], extent[1]], proj3857, proj4326);
                var extentPt2 = ol.proj.transform([extent[2], extent[3]], proj3857, proj4326);
                var extendConverted = extentPt1.concat(extentPt2);
                var url = '../../serveur/web/app_dev.php/GeoData/' + schema + '/' + tableName + '/' + AmsAuth.util.Authentification.apiKey + '?bbox=' + extendConverted.join(',');
                if (AmsAuth.util.Authentification.dataExtent !== null)
                {
                    var minXde = parseFloat(AmsAuth.util.Authentification.dataExtent["minX"]);
                    var maxXde = parseFloat(AmsAuth.util.Authentification.dataExtent["maxX"]);
                    var minYde = parseFloat(AmsAuth.util.Authentification.dataExtent["minY"]);
                    var maxYde = parseFloat(AmsAuth.util.Authentification.dataExtent["maxY"]);
                    var ext1 =  [
                        minXde,
                        minYde,
                        maxXde,
                        maxYde
                    ];
                    var ext2 = [
                        extentPt1[0],
                        extentPt1[1],
                        extentPt2[0],
                        extentPt2[1]
                    ];
                    if (ol.extent.intersects(ext1, ext2))
                    {
                        Ext.Ajax.request({
                            url: url,
                            success: function (response) {
                                var text = response.responseText;
                                var features = vectorSource.readFeatures(text);
                                vectorSource.addFeatures(features);
                            }
                        });
                    }
                }
                else
                {
                    Ext.Ajax.request({
                        url: url,
                        success: function (response) {
                            var text = response.responseText;
                            var features = vectorSource.readFeatures(text);
                            vectorSource.addFeatures(features);
                        }
                    });
                }


            },
            strategy: ol.loadingstrategy.bbox,
            //strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
            //    maxZoom: 19})),

            projection: 'EPSG:3857'
        });

        var layer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 20,
                    fill: new ol.style.Fill({color: 'green'})
                })
            })
        });
        layer.set('nodeId', record.get('id'));
        this.getView().getMap().getLayers().push(layer);

    }


});
