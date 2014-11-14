{def $your_node_id = 2
     $children = fetch('content', 'list', hash('parent_node_id', $your_node_id,
                                               'limit', '50',
                                               'class_filter_type', 'include',
                                               'class_filter_array', array( 'image'),
                                               'sort_by', $source_node.sort_array ))}
{if $children|count()|gt(0)}
    <section class="xrowslideshow">{* choose a class you want to address in JS in $(".xrowslideshow-example").xrowslideshow(); *}
        {if $block.name|trim|ne('')}
            <h2>
                <a href={$valid_nodes.0.parent|ezurlclean}>
                    {$node.name|wash()}
                </a>
            </h2>
        {/if}
        <div class="viewport">{* slider_viewport *}
            {foreach $children as $child}
                <a>{* item_container *}
                    <figure>
                        {attribute_view_gui attribute=$child.data_map.image image_class="medium"}
                        <figcaption>
                            {attribute_view_gui attribute=$child.data_map.caption}
                        </figcaption>
                    </figure>
                </a>
            {/foreach}
        </div>
    </section>
{/if}
{undef $your_node_id $children}